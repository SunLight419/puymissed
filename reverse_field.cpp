#include <iostream>
#include <vector>

extern "C" {
    // WebAssemblyに公開する関数の宣言
    void reverse_plain_field(int* plain_field, int length);
}

void reverse_plain_field(int* plain_field, int length) {
    std::vector<int> temp_plain_field(plain_field, plain_field + length);
    for(int i = 0; i < length; i++) {
        plain_field[i] = temp_plain_field[length - 1 - i];
    }
}
