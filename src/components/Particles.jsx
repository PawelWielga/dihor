function Particles({ count = 50 }) {
  const particles = Array.from({ length: count }).map((_, i) => {
    const style = {
      position: 'absolute',
      width: '2px',
      height: '2px',
      background: 'var(--accent-cyan)',
      borderRadius: '50%',
      opacity: Math.random() * 0.5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `float ${5 + Math.random() * 10}s linear infinite`,
    }
    return <div key={i} style={style} />
  })

  return (
    <div
      className="particles"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {particles}
    </div>
  )
}

export default Particles
