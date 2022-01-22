const mongoose = require('mongoose')

function loadMongodb() {
    mongoose.connect('mongodb://localhost/nodemontest').then((...args) => {
    }).catch((error) => {
        console.log(error)
    });
    mongoose.connection.once('open', () => {
        console.log('数据库连接成功……')
    })
    mongoose.connection.once('close', () => {
        console.log('数据库断开……')
    })
    return {
        status: 'success'
    }
}

let userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    sex: String,
    age: String,
    register: String,
    likes: Array,
    newThingJudges: [{
        id: String,
        title: String,
        judge: String,
        time: Date,
        delete: Boolean
    }],
    wallJudges: [{
        id: String,
        title: String,
        judge: String,
        time: Date,
        delete: Boolean
    }],
    newThings: [{
        id: Number,
        title: String,
        content: String,
        time: Date,
        delete: Boolean
    }],
    walls: [{
        id: Number,
        title: String,
        content: String,
        time: Date,
        delete: Boolean
    }]
})
let wallAndNewThingSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    time: Date,
    name: String,
    phone: String,
    like: Number,
    judge: Number,
    likes: Array,
    judges: [{
        id: Number,
        name: String,
        judge: String,
        time: Date,
        phone: String,
        delete: Boolean
    }],
    delete: Boolean
})
let idSchema = new mongoose.Schema({
    id: Number
})
let idModle = mongoose.model('id', idSchema);
idModle.find({}, (err, docs) => {
    if (docs.length === 0) {
        console.log("create id")
        idModle.create({
            id: 1
        })
    }
})

async function createId() {
    let result = await idModle.findOneAndUpdate({}, {$inc: {id: 1}}, {})
    return result.id;
}

let userModle = mongoose.model('user', userSchema);
let newThingModle = mongoose.model('newThing', wallAndNewThingSchema);
let wallModle = mongoose.model('wall', wallAndNewThingSchema);


async function addUser({name, phone, password, sex, age}) {
    let result = await findUser(name);
    let result2 = await findUser(phone)
    if (result.status !== 'failed' || result2.status !== 'failed') {
        return {
            status: 'failed', data: null
        }
    }
    userModle.create({
        name,
        phone,
        password,
        sex,
        age,
        register: new Date(),
        likes: [],
        newThingJudges: [],
        wallJudges: [],
        newThings: [],
        walls: []
    }, (err, docs) => {
        if (err) {
            console.log(err)
        }
    })
    return {
        status: 'success', data: findUser(phone)
    }
}

async function findUser(phone) {
    let result = await userModle.find({phone}).exec();
    if (result.length === 0) {
        return {status: 'failed', data: null}
    } else {
        return {status: 'success', data: result[0]}
    }
}

async function findName(name) {
    let result = await userModle.find({name}).exec();
    if (result.length === 0) {
        return {status: 'failed', data: null}
    } else {
        return {status: 'success', data: result[0]}
    }
}

async function checkUserPassword(phone, password) {
    let result = await findUser(phone);
    if (result.status === 'failed') {
        return {status: 'failed', data: null}
    } else if (result.data.password === password) {
        return {status: 'success', data: result.data}
    }
}


async function changeUserMessage(phone, obj) {
    let result=await userModle.findOneAndUpdate({phone}, {$set:obj}, {
        upsert: false
    })
    return {
        status: 'success', data: await findUser(phone)
    }
}

async function addNewThingLike(id, phone) {
    await newThingModle.findOneAndUpdate({id}, {
        $inc: {like: 1},
        $addToSet: {likes: [phone]}
    });
    await userModle.findOneAndUpdate({phone}, {
        $addToSet: {likes: [id]}
    })
    return {status: 'success', data: await findUser(phone)}
}

async function cancelNewThingLike(id, phone) {
    await newThingModle.findOneAndUpdate({id}, {
        $inc: {like: -1},
        $pull: {likes: phone}
    });
    await userModle.findOneAndUpdate({phone}, {
        $pull: {likes: id}
    })
    return {status: 'success', data: await findUser(phone)}
}

async function addWallLike(id, phone) {
    await wallModle.findOneAndUpdate({id}, {
        $inc: {like: 1},
        $addToSet: {likes: [phone]}
    });
    await userModle.findOneAndUpdate({phone}, {
        $addToSet: {likes: id}
    })
    return {status: 'success', data: await findUser(phone)}
}

async function cancelWallLike(id, phone) {
    await wallModle.findOneAndUpdate({id}, {
        $inc: {like: -1},
        $pull: {likes: [phone]}
    });
    await userModle.findOneAndUpdate({phone}, {
        $pull: {likes: id}
    })
    return {status: 'success', data: await findUser(phone)}
}

async function addNewThingJudge(id, phone, name, judge) {
    let newId = await createId();
    await newThingModle.findOneAndUpdate({id}, {
        $push: {
            judges: {
                id: newId,
                name,
                judge,
                time: new Date(),
                phone,
                delete: false
            }
        },
        $inc: {judge: 1}
    })
    let result = await newThingModle.findOne({id}).exec();
    await userModle.findOneAndUpdate({phone}, {
        $push: {
            newThingJudges: {
                id: newId,
                title: result.title,
                judge,
                time: new Date(),
                delete: false
            }
        }
    })
    return {status: 'success', data: null}
}

async function deleteNewThingJudge(id, phone, judgeId) {
    await newThingModle.findOneAndUpdate({id, 'judges.id': judgeId}, {
        $set: {
            'judges.$.delete': 'true'
        },
        $inc: {
            judge: -1
        }
    })
    await userModle.findOneAndUpdate({phone, 'NewThingJudges.id': judgeId}, {
        $set: {
            'NewThingJudges.$.delete': 'true'
        }
    })
    return {status: 'success', data: null}
}

async function getNewThingJudge(id) {
    let result = await newThingModle.find({id})
    return {status: 'success', data: result[0].judges}
}

async function addWallJudge(id, phone, name, judge) {
    let newId = await createId();
    await wallModle.findOneAndUpdate({id}, {
        $push: {
            judges: {
                id: newId,
                name,
                judge,
                time: new Date(),
                phone,
                delete: false
            }
        },
        $inc: {judge: 1}
    })
    let result = await wallModle.findOne({id}).exec();
    await userModle.findOneAndUpdate({phone}, {
        $push: {
            wallJudges: {
                id: newId,
                title: result.title,
                judge,
                time: new Date(),
                delete: false
            }
        }
    })
    return {status: 'success', data: null}
}

async function deleteWallJudge(id, phone, judgeId) {
    await wallModle.findOneAndUpdate({id, 'judges.id': judgeId}, {
        $set: {
            'judges.$.delete': 'true'
        },
        $inc: {
            judge: -1
        }
    })
    await userModle.findOneAndUpdate({phone, 'wallJudges.id': judgeId}, {
        $set: {
            'wallJudges.$.delete': 'true'
        }
    })
    return {status: 'success', data: null}
}

async function getWallJudge(id) {
    let result = await wallModle.find({id})
    return {status: 'success', data: result[0].judges}
}

async function addNewThing(phone, name, title, content) {
    let newId = await createId();
    await newThingModle.create({
        id: newId,
        title,
        content,
        time: new Date(),
        name: name,
        phone,
        like: 0,
        judge: 0,
        likes: [],
        judges: [],
        delete: false
    })
    await userModle.findOneAndUpdate({phone}, {
        $push: {
            newThings: [{
                id: newId,
                title,
                content,
                time: new Date(),
                delete: false
            }]
        }
    })
    return {status: 'success', data: null}
}

async function deleteNewThing(id, phone) {
    await newThingModle.findOneAndUpdate({id}, {
        $set: {
            delete: 'true'
        }
    })
    await userModle.findOneAndUpdate({phone, 'newThings.id': id}, {
        $set: {
            'newThings.$.delete': 'true'
        }
    })
    return {status: 'success', data: null}
}

async function addWall(phone, name, title, content) {
    let newId = await createId();
    await wallModle.create({
        id: newId,
        title,
        content,
        time: new Date(),
        name: name,
        phone,
        like: 0,
        judge: 0,
        likes: [],
        judges: [],
        delete: false
    })
    await userModle.findOneAndUpdate({phone}, {
        $push: {
            walls: [{
                id: newId,
                title,
                content,
                time: new Date(),
                delete: false
            }]
        }
    })
    return {status: 'success', data: null}
}

async function deleteWall(id, phone) {
    await wallModle.findOneAndUpdate({id}, {
        $set: {
            delete: 'true'
        }
    })
    await userModle.findOneAndUpdate({phone, 'walls.id': id}, {
        $set: {
            'walls.$.delete': 'true'
        }
    })
    return {status: 'success', data: null}
}

async function getNewThing(currentPage) {
    let result = await newThingModle.find({delete:false}, null, {
        sort: {time: -1}, skip: (currentPage - 1) * 8, limit: 8
    })
    let dataSize = await newThingModle.count({delete:false});
    return {status: 'success', data: result, dataSize}
}

async function getWall(currentPage) {
    let result = await wallModle.find({delete:false}, null, {
        sort: {time: -1}, skip: (currentPage - 1) * 8, limit: 8
    })
    let dataSize = await wallModle.count({delete:false});
    return {status: 'success', data: result, dataSize}
}

module.exports = {
    loadMongodb,
    addUser,
    findUser,
    findName,
    checkUserPassword,
    changeUserMessage,
    addNewThingLike,
    cancelNewThingLike,
    addWallLike,
    cancelWallLike,
    addNewThingJudge,
    deleteNewThingJudge,
    getNewThingJudge,
    addWallJudge,
    deleteWallJudge,
    getWallJudge,
    getNewThing,
    addNewThing,
    deleteNewThing,
    getWall,
    addWall,
    deleteWall
}
