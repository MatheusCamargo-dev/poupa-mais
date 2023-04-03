import apiServer from '@/services/api-back-end';

export default async function App() {
  const response = await apiServer('http://127.0.0.1:3000/api/user/');
  const data = await response.json();
  return (
    <div className="text-white">
      This is my app
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
