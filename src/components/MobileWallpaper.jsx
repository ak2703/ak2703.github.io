const SHAPES = [
  { size: 48, color: 'var(--yellow)', top: '8%',  left: '5%',  anim: 'floatA', dur: '9s',  delay: '0s',   borderRadius: '50%' },
  { size: 32, color: 'var(--mint)',   top: '15%', left: '80%', anim: 'floatB', dur: '11s', delay: '-3s',  borderRadius: '6px' },
  { size: 22, color: 'var(--red)',    top: '28%', left: '12%', anim: 'floatC', dur: '7s',  delay: '-1s',  borderRadius: '50%' },
  { size: 56, color: 'var(--blue)',   top: '38%', left: '88%', anim: 'floatA', dur: '13s', delay: '-5s',  borderRadius: '50%' },
  { size: 18, color: 'var(--pink)',   top: '48%', left: '30%', anim: 'floatB', dur: '8s',  delay: '-2s',  borderRadius: '4px' },
  { size: 40, color: 'var(--purple)', top: '58%', left: '70%', anim: 'floatC', dur: '10s', delay: '-4s',  borderRadius: '50%' },
  { size: 28, color: 'var(--orange)', top: '65%', left: '18%', anim: 'floatA', dur: '12s', delay: '-6s',  borderRadius: '50%' },
  { size: 14, color: 'var(--teal)',   top: '72%', left: '55%', anim: 'floatB', dur: '6s',  delay: '-1.5s', borderRadius: '50%' },
  { size: 36, color: 'var(--yellow)', top: '80%', left: '85%', anim: 'floatC', dur: '9s',  delay: '-7s',  borderRadius: '8px' },
  { size: 20, color: 'var(--mint)',   top: '85%', left: '40%', anim: 'floatA', dur: '11s', delay: '-3.5s', borderRadius: '50%' },
  { size: 44, color: 'var(--red)',    top: '10%', left: '50%', anim: 'floatB', dur: '14s', delay: '-8s',  borderRadius: '50%' },
  { size: 16, color: 'var(--blue)',   top: '93%', left: '12%', anim: 'floatC', dur: '8s',  delay: '-2.5s', borderRadius: '4px' },
]

export default function MobileWallpaper() {
  return (
    <div className="mobile-wallpaper">
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className="wallpaper-shape"
          style={{
            width: s.size,
            height: s.size,
            background: s.color,
            top: s.top,
            left: s.left,
            opacity: 0.09,
            borderRadius: s.borderRadius,
            animation: `${s.anim} ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}
