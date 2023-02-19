import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div
    style={{
        margin: '0, auto',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}>
      <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="50"
  visible={true}
        wrapperStyle={{
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',}}
    />
    </div>

  );
};

export default Loader;