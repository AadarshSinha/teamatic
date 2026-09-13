import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Procedural 3D model of the Teamatic chai maker, built from primitives.
 *
 * The shape is meant to read as a chai maker rather than a kettle: a wide
 * boiling pot on a heated base, a separate milk chamber clipped to the side,
 * and a strainer spout that the finished chai pours through.
 *
 * Auto-rotates slowly; tilts toward the cursor while the pointer is over the
 * hero. Resizes off its own container so it survives breakpoint changes.
 */
export default function ChaiMaker3D({ pointerTarget }) {
  const canvasRef = useRef(null)
  const holderRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const holder = holderRef.current
    if (!canvas || !holder) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // cap DPR for mobile GPUs
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.95
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 1.4, 15.5)
    camera.lookAt(0, 0.3, 0)

    // One group so tilt and spin apply to the whole appliance.
    const unit = new THREE.Group()
    scene.add(unit)

    /* ---- Materials ---------------------------------------------------- */
    const matte = new THREE.MeshStandardMaterial({
      color: 0x121214,
      metalness: 0.5,
      roughness: 0.58,
    })
    const steel = new THREE.MeshStandardMaterial({
      color: 0x54514e,
      metalness: 0.95,
      roughness: 0.3,
    })
    const glass = new THREE.MeshStandardMaterial({
      color: 0xc8d2d6,
      metalness: 0.1,
      roughness: 0.06,
      transparent: true,
      opacity: 0.2,
    })
    // Brewed chai — milky brown, lit from within so it reads through the glass.
    const chai = new THREE.MeshStandardMaterial({
      color: 0xb0703a,
      emissive: 0x7c3f12,
      emissiveIntensity: 0.6,
      roughness: 0.35,
    })
    const milk = new THREE.MeshStandardMaterial({
      color: 0xe8e2d6,
      roughness: 0.5,
    })
    const glow = new THREE.MeshBasicMaterial({ color: 0xf59e0b })

    /* ---- Geometry ------------------------------------------------------ */
    // Heated base plate
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.15, 0.36, 64), matte)
    base.position.y = -2.2
    unit.add(base)

    // Amber element ring — the heat, visible
    const element = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.04, 16, 96), glow)
    element.rotation.x = Math.PI / 2
    element.position.y = -1.98
    unit.add(element)

    // Boiling pot: wide, short, steel-collared — deliberately pot-shaped, not kettle-shaped
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.5, 1.9, 64, 1, true), glass)
    pot.position.y = -0.9
    unit.add(pot)

    // The chai inside, filling the lower two-thirds
    const liquid = new THREE.Mesh(new THREE.CylinderGeometry(1.56, 1.46, 1.15, 64), chai)
    liquid.position.y = -1.25
    unit.add(liquid)

    // Steel rim around the pot mouth
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.07, 16, 96), steel)
    rim.rotation.x = Math.PI / 2
    rim.position.y = 0.05
    unit.add(rim)

    // Machine head — holds the pod bay and the controls
    const head = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.66, 1.15, 64), matte)
    head.position.y = 0.66
    unit.add(head)

    // Glowing status band on the head
    const band = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.03, 16, 96), glow)
    band.rotation.x = Math.PI / 2
    band.position.y = 0.55
    unit.add(band)

    // Pod bay lid on top
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(1.26, 1.46, 0.3, 64), steel)
    lid.position.y = 1.35
    unit.add(lid)
    const latch = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.2, 32), matte)
    latch.position.y = 1.56
    unit.add(latch)

    // Milk chamber — a separate translucent cylinder clipped to the side, which
    // is what visually distinguishes a chai maker from a tea kettle.
    const chamber = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 1.8, 40, 1, true), glass)
    chamber.position.set(1.95, -0.6, 0.55)
    unit.add(chamber)
    const milkFill = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.1, 40), milk)
    milkFill.position.set(1.95, -0.9, 0.55)
    unit.add(milkFill)
    const chamberCap = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.54, 0.14, 40), steel)
    chamberCap.position.set(1.95, 0.32, 0.55)
    unit.add(chamberCap)

    // Strainer spout — the chai pours out through here
    const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.26, 0.9, 32), steel)
    spout.position.set(-1.66, -0.5, 0.5)
    spout.rotation.z = Math.PI / 7
    unit.add(spout)

    unit.position.y = 0.45

    /* ---- Studio lighting ------------------------------------------------ */
    scene.add(new THREE.AmbientLight(0x8d97a6, 0.2)) // soft fill

    const key = new THREE.DirectionalLight(0xffffff, 1.05) // key, front-right
    key.position.set(5, 7, 6)
    scene.add(key)

    const rimLight = new THREE.DirectionalLight(0x7f93b5, 0.55) // cool rim, back-left
    rimLight.position.set(-7, 3, -5)
    scene.add(rimLight)

    const inner = new THREE.PointLight(0xd97706, 1.5, 10, 2) // warmth inside the pot
    inner.position.set(0, -1.0, 0)
    scene.add(inner)

    const underGlow = new THREE.PointLight(0xd97706, 0.8, 9, 2) // heat off the base plate
    underGlow.position.set(1.6, -2.1, 1.8)
    scene.add(underGlow)

    /* ---- Resize --------------------------------------------------------- */
    // Sized from the container, not the window, so it stays correct through
    // every breakpoint change and orientation flip.
    const resize = () => {
      const w = holder.clientWidth
      const h = holder.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.position.z = w < 520 ? 19 : 15.5 // pull back so it never crops on phones
      camera.updateProjectionMatrix()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(holder)
    window.addEventListener('resize', resize)
    resize()

    /* ---- Render loop ----------------------------------------------------- */
    const clock = new THREE.Clock()
    const tilt = { x: 0, y: 0 }
    let frameId

    const frame = () => {
      frameId = requestAnimationFrame(frame)
      const t = clock.getElapsedTime()
      const p = pointerTarget.current

      // Ease toward the pointer rather than snapping to it.
      tilt.x += (p.y * 0.2 - tilt.x) * 0.05
      tilt.y += (p.x * 0.45 - tilt.y) * 0.05

      if (!reduced) unit.rotation.y += 0.0035
      unit.rotation.x = tilt.x
      unit.rotation.z = -tilt.y * 0.12 // slight counter-roll, like a held object
      unit.position.y = 0.45 + Math.sin(t * 0.9) * 0.04

      // The element pulses as if cycling to hold a simmer.
      inner.intensity = 1.5 + Math.sin(t * 1.6) * 0.25

      renderer.render(scene, camera)
    }
    frame()

    /* ---- Teardown --------------------------------------------------------- */
    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) obj.material.dispose()
      })
      renderer.dispose()
    }
  }, [pointerTarget])

  return (
    <div
      ref={holderRef}
      className="relative mx-auto h-[380px] w-full max-w-[620px] sm:h-[460px] lg:h-[560px]"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-label="Rotating 3D model of Teamatic, showing the boiling pot, side milk chamber and strainer spout"
      />
    </div>
  )
}
