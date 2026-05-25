const MONO = '"JetBrains Mono", monospace'

export default function Footer() {
  return (
    <footer style={{
      padding: 'clamp(32px, 4vw, 48px) clamp(24px, 4vw, 48px) 32px',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontFamily: MONO, fontSize: 13, color: 'var(--accent)' }}>
          rclr<span style={{ color: 'var(--fg-soft)' }}>.com</span>
        </div>
        <div style={{ display: 'flex', gap: 20, fontFamily: MONO, fontSize: 11, color: 'var(--fg-soft)', flexWrap: 'wrap' }}>
          <span>© {new Date().getFullYear()} RCLR</span>
          <a href="https://linkedin.com/in/rafaelncintra" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>linkedin</a>
          <a href="https://linkedin.com/in/lrosocha" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>larissa/li</a>
          <a href="https://medium.com/@rafaelnc" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>medium</a>
          <a href="#blog" style={{ color: 'inherit', textDecoration: 'none' }}>rss</a>
        </div>
      </div>
    </footer>
  )
}
