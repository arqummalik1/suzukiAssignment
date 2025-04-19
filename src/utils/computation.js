export const Computation = (item) => {
    // Simulate heavy computation
    let result = '';
    for (let i = 0; i < 10000; i++) {
      result = `${item.title.split('').reverse().join('')} - ${Math.sqrt(i) * item.id}`;
    }
    console.log("Result ==>>",result)
    return `Computed: ${result.substring(0, 30)}...`;
  };