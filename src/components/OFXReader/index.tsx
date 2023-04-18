'use client';
import { apiClient } from '@/services/api-client';

export default function OFXReader() {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await apiClient(
          'http://localhost:3000/api/transactions/ofx/',
          'POST',
          formData
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="mt-5">
      <input
        type="file"
        className="rounded-md bg-green-300"
        onChange={handleFileChange}
      ></input>
    </div>
  );
}
