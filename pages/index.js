export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Cash-flow Admin Dashboard</h1>
      <p>Welcome to the admin dashboard</p>
      <ul>
        <li><a href="/users">Users</a></li>
        <li><a href="/analytics">Analytics</a></li>
        <li><a href="/campaigns">Campaigns</a></li>
      </ul>
    </div>
  );
}
