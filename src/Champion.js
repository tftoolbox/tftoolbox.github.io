import { useDrag } from 'react-dnd';

const Champion = ({ position, onDragStart, onDragEnd, hexagonType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CHAMPION',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        drag(node);
        onDragStart();
      }}
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        backgroundImage: `url(${'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TahmKench_20.jpg'})`,
        backgroundSize: 'cover',
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    ></div>
  );
};

export default Champion;
