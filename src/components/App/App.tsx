import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { KmeansChart } from '../KmeansChart';

export const dataExample = Array.from({ length: 100 }, () => ({
  x: faker.number.float({ min: -100, max: 100 }),
  y: faker.number.float({ min: -100, max: 100 }),
}));

const App = () => {
  const [k, setK] = useState<string>();

  return (
    <div style={{ padding: '10px' }}>
      <input placeholder="Введите количество кластеров" value={k} onChange={(e) => setK(e.target.value)} />
      <button type="button">Старт</button>
      <div style={{ maxWidth: '800x', margin: '0 auto' }}>
        <KmeansChart data={dataExample} />
      </div>
    </div>
  );
};

export default App;
