import './Snowflakes.css';

const SNOWFLAKES_COUNT = 40;

const Snowflakes = () => {
  return (
    <div className="snow">
      {Array.from({ length: SNOWFLAKES_COUNT }).map((_, i) => {
        const fontSize = (Math.random() * (1.5 - 0.7) + 0.7).toFixed(1);
        const duration = Math.floor(Math.random() * 11) + 20;
        const delay = Math.floor(Math.random() * 22) - 1;

        return (
          <div
            key={i}
            className="snow__flake"
            style={{
              fontSize: `${fontSize}em`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            ﹡
          </div>
        );
      })}
    </div>
  );
};

export default Snowflakes;
