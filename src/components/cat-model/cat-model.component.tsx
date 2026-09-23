import './cat-model.styles.scss';

import {
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type Group } from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
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
  yaw: RefObject<number>;
  dragging: RefObject<boolean>;
  lastInteraction: RefObject<number>;
  idleDelayMs: number;
}

/** Load the GLB and rotate its parent only around the world up axis. */
function CatMesh(props: CatSceneProps) {
  const { url, onLoaded, yaw, dragging, lastInteraction, idleDelayMs } = props;

  const gltf = useLoader(GLTFLoader, url);
  const group = useRef<Group | null>(null);

  useEffect(() => {
    onLoaded(true);
  }, [onLoaded]);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    if (!dragging.current && Date.now() - lastInteraction.current >= idleDelayMs) {
      yaw.current += delta * 0.35;
    }

    group.current.rotation.y = yaw.current;
  });

  return (
    <group ref={group} position={[0, -1.08, 0]}>
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
  const yaw = useRef(0);
  const lastInteraction = useRef(Date.now());
  const dragging = useRef(false);
  const pointerId = useRef<number | null>(null);
  const previousX = useRef(0);
  const lastTouchTap = useRef<number | null>(null);

  useEffect(() => {
    const catPicked =
      CAT_MODELS[Math.min(Math.floor(Math.random() * CAT_MODELS.length), CAT_MODELS.length - 1)] ??
      CAT_MODELS[0];

    setModel(catPicked);
    lastInteraction.current = Date.now();
  }, []);

  /** Begin mouse drag immediately; require a double tap for touch drag. */
  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' && !touchEnabled) {
      const now = Date.now();

      if (lastTouchTap.current !== null && now - lastTouchTap.current <= DOUBLE_TAP_MS) {
        setTouchEnabled(true);
        lastInteraction.current = now;
        lastTouchTap.current = null;
      } else {
        lastTouchTap.current = now;
      }

      return;
    }

    dragging.current = true;
    pointerId.current = event.pointerId;
    previousX.current = event.clientX;
    lastInteraction.current = Date.now();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  /** Horizontal dragging changes yaw only; the cat never tilts. */
  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current || pointerId.current !== event.pointerId) {
      return;
    }

    yaw.current += (event.clientX - previousX.current) * DRAG_RADIANS_PER_PIXEL;
    previousX.current = event.clientX;
    lastInteraction.current = Date.now();
  }

  /** Release the drag so the idle timer can start again. */
  function handlePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerId.current !== event.pointerId) {
      return;
    }

    dragging.current = false;
    pointerId.current = null;
    lastInteraction.current = Date.now();

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
    yaw.current += event.key === 'ArrowLeft' ? -0.2 : 0.2;
    lastInteraction.current = Date.now();
  }

  return (
    <ErrorBoundary>
      <div
        className="cat-model"
        data-touch-enabled={touchEnabled}
        role="group"
        aria-label={`${model?.name ?? 'Cat'} 3D model`}
        aria-description="Drag horizontally to rotate. On touch screens, double tap first. Arrow keys also rotate."
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
                yaw={yaw}
                dragging={dragging}
                lastInteraction={lastInteraction}
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
