/**
 * @description 测试demo
 */
function sum(a,b){
    return a+b
}
test('10+20=>30',()=>{
     const res = sum(10,20)
     expect(res).toBe(30)//.not.toBe
})
test('10+20=>30',()=>{
    const res = sum(10,20)
    expect(res).toBe(30)//.not.toBe
})
