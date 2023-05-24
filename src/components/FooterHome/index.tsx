import { BsGithub, BsWhatsapp } from 'react-icons/bs';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { ImRocket } from 'react-icons/im';
export default function FooterHome() {
  return (
    <>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-1">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="lg:w-1/3 lg:mb-0 text-center gap-2">
              <h4 className="text-lg font-bold">Contatos</h4>
              <p className="leading-loose ">
                Email: matheuscamargodev@gmail.com
              </p>
            </div>
            <div className="lg:w-1/3 lg:mb-0 flex flex-col justify-center items-center gap-2">
              <h4 className="text-lg font-bold">Fale com o CEO</h4>
              <div className="flex justify-center lg:justify-start mb-2 gap-5">
                <a
                  className="btn-social"
                  href="https://www.linkedin.com/in/matheus-camargo-dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn
                    size={25}
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
                    size={25}
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
                    size={25}
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
            <div className="lg:w-1/3 text-center">
              <h4 className="text-lg font-bold">Sobre mim </h4>
              <p className="leading-loose hover:text-indigo-500 flex items-center text-center justify-center">
                {' '}
                Trying to do better! <ImRocket className="ml-2" />
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 py-1">
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
