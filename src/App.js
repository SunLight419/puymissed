import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import Header from './Header';
import Usage from './Usage';
import UpdateHistory from './UpdateHistory';
import Footer from './Footer';

const initialPlainField = Array(78).fill("empty");

const colorMap = {
  empty: "white",
  red: "#DC143C", // カスタム赤色
  blue: "#337FFF", // カスタム青色
  green: "#228B22", // カスタム緑色
  yellow: "#FFD700", // カスタム黄色
  purple: "#B933FF", // カスタム紫色
  ojama: "#c0c0c0", // カスタム灰色
};

const speedMap = {
  slow: 1000,
  moderate: 500,
  fast: 100,
  instantaneous: 0,
};

function App() {

  const [plainField, setPlainField] = useState(initialPlainField);
  const [selectedColor, setSelectedColor] = useState("red");
  const [chainSpeed, setChainSpeed] = useState("moderate");
  const [previousPlainField, setPreviousPlainField] = useState(null);
  const [fallen, setFallen] = useState(false);
  const [chainCount, setChainCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // update history
  const [updates, setUpdates] = useState([
    '2023-03-24 バージョン 0.0.1 - ベータ版リリース',
    '2023-03-26 バージョン 0.0.2 - 使い方、更新履歴を追加',
    '2023-03-26 Sample',
    '2023-03-26 Sample',
    '----',
    '2023-??-?? バージョン 1.0.1 - 初期リリース(予定)',
  ]);



  const handleLeftClick = (index) => {
    const newPlainField = [...plainField];
    newPlainField[index] = selectedColor;
    setPlainField(newPlainField);
    setFallen(false);
  };

  const handleMouseDown = (index) => {
    setIsMouseDown(true);
    const newPlainField = [...plainField];
    newPlainField[index] = selectedColor;
    setPlainField(newPlainField);
    setFallen(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (index) => {
    if (isMouseDown) {
      const newPlainField = [...plainField];
      newPlainField[index] = selectedColor;
      setPlainField(newPlainField);
      setFallen(false);
    }
  };




  const handleRightClick = (e, index) => {
    e.preventDefault(); // ブラウザのデフォルトの右クリックメニューを無効化
    const newPlainField = [...plainField];
    newPlainField[index] = "empty";
    setPlainField(newPlainField);
    setFallen(false);
  };

  const handleAutoClick = () => {
    console.log("Auto Button clicked!");
    setPreviousPlainField([...plainField]);
    chain();
  };

  const handleSpeedChange = (e) => {
    console.log("Speed changed!");
    setChainSpeed(e.target.value);
  };

  const handleStepClick = () => {
    console.log("Step Button clicked!");
    if (!previousPlainField) {
      setPreviousPlainField([...plainField]);
    }

    // fallen が false の場合、fall 関数を実行する
    // そうでなければ、single_chain 関数を実行し、fallen を false にする
    if (!fallen) {
      console.log("call fall()");
      const newPlainField = fall(plainField); // この行を追加
      setPlainField(newPlainField); // この行を追加
      setFallen(true);
    } else {
      console.log("call single_chain()");
      let result = single_chain(plainField);
      if (result) setPlainField(result);
      setFallen(false);
    }
  };


  const handleRedoClick = () => {
    setChainCount(0);
    setScore(0);
    if (previousPlainField) {
      console.log("Redo Button clicked sucsessfully!");
      setPlainField(previousPlainField);
      setPreviousPlainField(null);
    } else {
      console.log("Redo Button clicked but previousPlainField is null!");
    }
  };

  const handleFieldClearClick = () => {
    console.log("Field Clear Button clicked!");
    setPreviousPlainField([...plainField]);
    setPlainField(initialPlainField);
    setChainCount(0);
    setScore(0);
  };

  /* 連鎖関連 */

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const syncSleep = (ms) => {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      // Busy waiting
    }
  };


  const chain = async () => {
    let localChainCount = 0;
    let localScore = 0;
    let newPlainField = fall(plainField);
    setPlainField(newPlainField);
    if (speedMap[chainSpeed] !== 0) {
      await sleep(speedMap[chainSpeed]);
    }

    let chainCount = 0;
    let result = single_chain(newPlainField);
    if (result) setPlainField(result);
    if (speedMap[chainSpeed] !== 0) {
      await sleep(speedMap[chainSpeed]);
    }

    while (result) {
      localChainCount++;
      localScore += localChainCount * localChainCount;

      newPlainField = fall(result);
      setPlainField(newPlainField);

      if (speedMap[chainSpeed] !== 0) {
        await sleep(speedMap[chainSpeed]);
      }


      result = single_chain(newPlainField);
      if (result == null) break;
      setPlainField(result);
      if (speedMap[chainSpeed] !== 0) {
        await sleep(speedMap[chainSpeed]);
      }

      if (chainCount > 24) {
        console.error("chain error:chainCount is greater than 24");
        break;
      }
    }
    setChainCount(localChainCount);
    setScore(localScore);
    console.log("Chain count:", localChainCount);
  };


  const single_chain = (inputPlainField) => {
    console.log("single_chain() called");
    const CopyField = [...inputPlainField];
    const visited = new Array(plainField.length).fill(false);
    const directions = [-6, 6, -1, 1];
    let chainOccurred = false;

    for (let i = 6; i < 78; i++) {
      let queue = [i];
      let connectedPuyos = [];
      let currentColor = CopyField[i];
      if (currentColor === "ojama" || currentColor === "empty") continue;

      while (queue.length > 0) {
        let current = queue.shift();

        if (visited[current]) continue;

        visited[current] = true;
        connectedPuyos.push(current);

        for (const direction of directions) {
          let next = current + direction;

          // 配列の境界を越えないようにする
          if (next < 6 || next >= 78) continue;

          // 左端と右端のぷよが接続しないようにする
          if ((current % 6 === 0 && direction === -1) || (current % 6 === 5 && direction === 1)) continue;

          // 探索条件を満たすかどうかをチェック
          if (CopyField[next] === currentColor && !visited[next]) {
            queue.push(next);
          }
        }
      }

      if (connectedPuyos.length >= 4) {
        chainOccurred = true;

        // 連鎖したぷよを"empty"にする
        for (const index of connectedPuyos) {
          CopyField[index] = "empty";
          for (const direction of directions) {
            let next = index + direction;

            // 配列の境界を越えないようにする
            if (next < 6 || next >= 78) continue;

            // 左端と右端のぷよが接続しないようにする
            if ((index % 6 === 0 && direction === -1) || (index % 6 === 5 && direction === 1)) continue;

            // おじゃまが消える条件を満たすかどうかをチェック
            if (CopyField[next] === "ojama") {
              console.log(index);
              CopyField[next] = "empty";
            }
          }
        }
      }
    }

    if (chainOccurred) {
      setFallen(false);
      return CopyField;
    }

    return null;
  }



  const fall = (inputPlainField) => {
    console.log("fall() called");
    let copyField = [...inputPlainField];

    for (let x = 0; x < 6; x++) {
      let idx = -1;

      for (let y = 12; y >= 0; y--) {
        const currentCell = copyField[x + 6 * y];
        if (idx === -1 && currentCell === "empty") {
          idx = y;
        } else if (idx !== -1 && currentCell !== "empty") {
          // 交換
          copyField[x + 6 * idx] = currentCell;
          copyField[x + 6 * y] = "empty";
          idx--;
        }
      }
    }
    setFallen(true);
    return copyField
    //plainField = copyField; // この行を追加
  };

  const renderCell = (color, index) => (
    <div
      key={index}
      className="cell"
      onClick={() => handleLeftClick(index)}
      onContextMenu={(e) => handleRightClick(e, index)} // 右クリック
      // 以下、長押し処理
      onMouseDown={() => handleMouseDown(index)}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => handleMouseEnter(index)}
    >
      {color !== "empty" && (
        <div
          className="cell-inner"
          style={{ backgroundColor: colorMap[color] }}
        >
          <div className="eye eye-left">
            <div className="eye-outer">
              <div
                className="eye-inner"
                style={{ backgroundColor: colorMap[color] }}
              ></div>
            </div>
          </div>
          <div className="eye eye-right">
            <div className="eye-outer">
              <div
                className="eye-inner"
                style={{ backgroundColor: colorMap[color] }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  //wasm

  /// PlainFieldの値を0〜6の数字に変換する関数
  function convertPlainFieldToNumbers(plainField) {
    const conversionTable = {
      'empty': 0,
      'red': 1,
      'blue': 2,
      'green': 3,
      'yellow': 4,
      'purple': 5,
      'ojama': 6
    };

    const numbersArray = new Array(6 * 13).fill(0);

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 13; y++) {
        numbersArray[x * 13 + y] = conversionTable[plainField[x + y * 6]];
      }
    }

    return numbersArray;
  }

  // 数値をPlainFieldの要件に合うように変換する関数
  function convertNumbersToPlainField(numbersArray) {
    const conversionTable = {
      0: 'empty',
      1: 'red',
      2: 'blue',
      3: 'green',
      4: 'yellow',
      5: 'purple',
      6: 'ojama'
    };

    const innerField = new Array(6 * 13).fill('empty');

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 13; y++) {
        innerField[x + y * 6] = conversionTable[numbersArray[x * 13 + y]];
      }
    }

    return innerField;
  }

  // render cell


  const renderRow = (start) => {
    const row = [];
    for (let i = start; i < start + 6; i++) {
      row.push(renderCell(plainField[i], i));
    }
    return <div className="row">{row}</div>;
  };

  const renderField = () => {
    const field = [];
    for (let i = 0; i < 13; i++) {
      field.push(renderRow(i * 6));
    }
    return <div>{field}</div>;
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex" }}>
        {renderField()}
        <div className="color-picker">
          {Object.keys(colorMap)
            .filter((_, i) => i % 4 === 0)
            .map((_, rowIndex) => (
              <div key={rowIndex} className="color-picker-row">
                {Object.keys(colorMap)
                  .slice(rowIndex * 4, rowIndex * 4 + 4)
                  .map((color) => (
                    <div
                      key={color}
                      className={`color-option${color === selectedColor ? " selected" : ""} ${color}`}
                      style={{ backgroundColor: color === "empty" ? "white" : colorMap[color] }}
                      onClick={() => handleColorChange(color)}
                    ></div>
                  ))}
              </div>
            ))}
          {/* wasm用ボタン */}
          {/* <button>WASMボタン</button> */}
          {/* 連鎖数と得点を表示 */}
          <div className="chain-score">
            {chainCount} 連鎖 {score}(実装予定) 点
          </div>
          <button onClick={handleAutoClick}>Auto</button>
          <select value={chainSpeed} onChange={handleSpeedChange}>
            <option value="instantaneous">Instantaneous（爆速）</option>
            <option value="fast">Fast（速）</option>
            <option value="moderate">Moderate（中）</option>
            <option value="slow">Slow（遅）</option>
          </select>
          <button onClick={handleStepClick}>Step</button>
          <button onClick={handleRedoClick}>Redo</button>
          <button onClick={handleFieldClearClick}>Field Clear</button>
        </div>
      </div>
      <Usage />
      <UpdateHistory updates={updates} />
      <Footer />
    </div>
  );


}

export default App;
