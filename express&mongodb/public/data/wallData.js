let data = []

for (let i = 1; i < 50; i++) {
    let x = {
        id: i,
        title: `title${i}`,
        content: "content",
        time: new Date(),
        'userName': 'username',
        like: i,
        judge: i
    }
    data.push(x);
}
module.exports = {
    data
}
