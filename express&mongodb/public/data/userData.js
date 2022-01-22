let data = []

for (let i = 1; i < 50; i++) {
    let x = {
        name: `name${i}`,
        phone: `phone${i}`,
        sex: "男",
        register: new Date(),
        password: `password${i}`,
        age: i,
        judges: [`title${i}`],
        likes: [`title${i}`],
        header:'/images/header.png'
    }
    data.push(x);
}
module.exports = {
    data
}
