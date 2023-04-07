import { BsGithub, BsWhatsapp } from 'react-icons/bs';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { ImRocket } from 'react-icons/im';
export default function FooterHome() {
  return (
    <>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="lg:w-1/3 mb-8 lg:mb-0 text-center">
              <h4 className="text-lg font-bold mb-4">Contatos</h4>
              <p className="leading-loose ">
                Email: matheuscamargodev@gmail.com
              </p>
            </div>
            <div className="lg:w-1/3 mb-8 lg:mb-0 flex flex-col justify-center items-center">
              <h4 className="text-lg font-bold mb-4">Fale com CEO</h4>
              <div className="flex justify-center lg:justify-start mb-2 gap-5">
                <a
                  className="btn-social"
                  href="https://www.linkedin.com/in/matheus-camargo-dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn
                    size={30}
                    className="text-white hover:text-blue-500"
                  />
                </a>
                <a
                  className="btn-social"
                  href="https://github.com/MatheusCamargo-dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub
                    size={30}
                    className="text-white hover:text-indigo-400"
                  />
                </a>
                <a
                  className="btn-social"
                  href="https://api.whatsapp.com/send?phone=5551997817499"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsWhatsapp
                    size={30}
                    className="text-white hover:text-green-400"
                  />
                </a>
                <a
                  className="btn-social"
                  href="https://www.instagram.com/matheus_camargo.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram
                    size={30}
                    className="text-white hover:text-instagram"
                  />
                </a>
              </div>
            </div>
            <div className="lg:w-1/3">
              <h4 className="text-lg font-bold mb-4">About Me </h4>
              <p className="leading-loose flex items-center">
                {' '}
                Trying to do better! <ImRocket className="ml-2" />
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 py-4">
          <div className="container mx-auto">
            <p className="text-center text-white text-sm">
              &copy; Matheus Camargo 2023
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
