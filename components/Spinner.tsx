import { FC } from "react";
import { ImSpinner8 } from "react-icons/im";
interface SpinnerProps {
  size: number;
  [key: string]: any;
}

const Spinner: FC<SpinnerProps> = ({ size, ...rest }) => {
  return (
    <div {...rest}>
      <ImSpinner8 className="animate-spin" size={size} />
    </div>
  );
};

export default Spinner;
