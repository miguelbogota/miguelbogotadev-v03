import './cat-model.styles.scss';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type Group } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { ErrorBoundary } from '@/components/error-boundary';
import { API_URL } from '@/server-actions/constants';

/** Model assets are served from the portfolio API. */
const modelBaseUrl = `${API_URL}/assets/cats`;
const IDLE_DELAY_MS = 1000;
const DOUBLE_TAP_MS = 350;
const DRAG_RADIANS_PER_PIXEL = 0.01;

/** A cat model definition with a name and a URL to its GLB. */
interface CatModelDefinition {
  id: 'june' | 'brownie';
  name: string;
  url: string;
}

/** A list of available cat models. */
const CAT_MODELS: readonly [CatModelDefinition, CatModelDefinition] = [
  { id: 'june', name: 'June', url: `${modelBaseUrl}/june.glb` },
  { id: 'brownie', name: 'Brownie', url: `${modelBaseUrl}/brownie.glb` },
];

/** Props for the cat scene. */
interface CatSceneProps {
  url: string;
  onLoaded: (loaded: boolean) => void;
  yawRef: RefObject<number>;
  draggingRef: RefObject<boolean>;
  lastInteractionRef: RefObject<number>;
  idleDelayMs: number;
}

/** Load the GLB and rotate its parent only around the world up axis. */
function CatMesh(props: CatSceneProps) {
  const { url, onLoaded, yawRef, draggingRef, lastInteractionRef, idleDelayMs } = props;

  const gltf = useLoader(GLTFLoader, url);
  const groupRef = useRef<Group | null>(null);

  useEffect(() => {
    onLoaded(true);
  }, [onLoaded]);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    if (!draggingRef.current && Date.now() - lastInteractionRef.current >= idleDelayMs) {
      yawRef.current += delta * 0.35;
    }

    groupRef.current.rotation.y = yawRef.current;
  });

  return (
    <group ref={groupRef} position={[0, -1.08, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

/** A client-only viewer that keeps pointer movement out of React render state. */
export function CatModel() {
  const [model, setModel] = useState<CatModelDefinition | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchEnabled, setTouchEnabled] = useState(false);
  // The GLB's face points toward +Z, where the camera starts.
  const yawRef = useRef(0);
  const lastInteractionRef = useRef(0);
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const previousXRef = useRef(0);
  const lastTouchTapRef = useRef<number | null>(null);

  useEffect(() => {
    const catPicked =
      CAT_MODELS[Math.min(Math.floor(Math.random() * CAT_MODELS.length), CAT_MODELS.length - 1)] ??
      CAT_MODELS[0];

    setModel(catPicked);
    lastInteractionRef.current = Date.now();
  }, []);

  /** Begin mouse drag immediately; require a double tap for touch drag. */
  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' && !touchEnabled) {
      const now = Date.now();

      if (lastTouchTapRef.current !== null && now - lastTouchTapRef.current <= DOUBLE_TAP_MS) {
        setTouchEnabled(true);
        lastInteractionRef.current = now;
        lastTouchTapRef.current = null;
      } else {
        lastTouchTapRef.current = now;
      }

      return;
    }

    draggingRef.current = true;
    pointerIdRef.current = event.pointerId;
    previousXRef.current = event.clientX;
    lastInteractionRef.current = Date.now();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  /** Horizontal dragging changes yaw only; the cat never tilts. */
  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
      return;
    }

    yawRef.current += (event.clientX - previousXRef.current) * DRAG_RADIANS_PER_PIXEL;
    previousXRef.current = event.clientX;
    lastInteractionRef.current = Date.now();
  }

  /** Release the drag so the idle timer can start again. */
  function handlePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    draggingRef.current = false;
    pointerIdRef.current = null;
    lastInteractionRef.current = Date.now();

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  /** Arrow keys provide the same single-axis control without a pointer. */
  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    yawRef.current += event.key === 'ArrowLeft' ? -0.2 : 0.2;
    lastInteractionRef.current = Date.now();
  }

  return (
    <ErrorBoundary>
      <div
        className="cat-model"
        data-touch-enabled={touchEnabled}
        role="group"
        aria-label={`${model?.name ?? 'Cat'} 3D model. Drag horizontally to rotate. On touch screens, double tap first. Arrow keys also rotate.`}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        <Canvas
          camera={{ position: [3, 2, 3], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true }}
          aria-hidden="true"
        >
          <ambientLight intensity={2} />
          <directionalLight position={[3, 6, 5]} intensity={2} />
          <directionalLight position={[-4, 3, -3]} intensity={1} />

          {model ? (
            <Suspense fallback={null}>
              <CatMesh
                url={model.url}
                onLoaded={setIsLoaded}
                yawRef={yawRef}
                draggingRef={draggingRef}
                lastInteractionRef={lastInteractionRef}
                idleDelayMs={IDLE_DELAY_MS}
              />
            </Suspense>
          ) : null}
        </Canvas>

        {isLoaded && (
          <>
            <span className="desktop-hint" aria-hidden="true">
              Drag to rotate
            </span>
            <span className="touch-hint" aria-hidden="true">
              {touchEnabled ? 'Drag to rotate' : 'Double tap to rotate'}
            </span>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
