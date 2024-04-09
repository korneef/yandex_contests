const array = [1, 2, 3]

function arrEdit(array) {
  array[1] = 0
  function edit2(array) {
    array[2] = 0
  }
  edit2(array)
}

arrEdit(array)

console.log(array)
