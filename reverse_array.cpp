#include <emscripten.h>
#include <algorithm>
#include <vector>

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  void reverse_array(int* array, int length) {
    std::vector<int> vec(array, array + length);
    std::reverse(vec.begin(), vec.end());
    std::copy(vec.begin(), vec.end(), array);
  }
}
