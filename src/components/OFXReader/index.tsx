'use client';
import { Parser } from 'xml2js';

export default function OFXReader() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        const file = files[i];
        console.log(file);
        if (file) {
          const reader = new FileReader();
          const { name } = file;
          const ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
          const isOFX = ext == 'ofx';
          console.log(isOFX);
          reader.onload = (event) => {
            const ofx = event.target?.result;
            console.log('aaaaaq');
            if (ofx && isOFX) {
              console.log('aq');
              const parser = new Parser({
                explicitArray: false,
                mergeAttrs: true
              });

              parser.parseString(ofx, (err, result) => {
                if (err) console.error(err);
                console.log(result);
              });
            }
          };

          reader.readAsText(file);
        }
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
