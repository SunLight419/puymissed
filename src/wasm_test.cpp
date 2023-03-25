#include <iostream>
#include <emscripten/emscripten.h>

extern "C" {

int yourFunction(int* arr, int length) {
  // ここで配列に対して処理を行う
  for (int i = 0; i < length; i++) {
    arr[i] = arr[i] / 2; // 配列の各要素を2倍にする例
  }

  // 処理が終わったら、何らかの結果を返す（例えば、処理が成功したかどうかを示すフラグ）
  return 1;
}

} // extern "C"
