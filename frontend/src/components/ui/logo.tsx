import { useNavigate } from "react-router-dom";
import { ROOT_PATH } from "../../router/router-path";

export interface ILogoProps {
  src: string;
  alt: string;
  height?: string;
  width?: string;
  onClick?: () => void;
}

const Logo = ({ src, alt, height = '30px', width = '132px', onClick }: ILogoProps) => {
  const navigate = useNavigate();

  const homeClick = () => {
    navigate(ROOT_PATH)
  };

  const logoClick = onClick ? onClick : homeClick;
  return <img src={src} alt={alt} height={height} width={width} onClick={logoClick} />
};

export default Logo;
