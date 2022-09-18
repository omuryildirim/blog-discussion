const mockUserData = [{
    name: 'Anna Karenina',
    _id: '6325c5e7c7fd8afeaff45fb3',
    image: 'anna.jpeg'
}, {
    name: 'Aleksey Vronski',
    _id: '6325c5e7c7fd8afeaff45fb4',
    image: 'vronski.jpeg'
}, {
    name: 'Konstantin Levin',
    _id: '6325c5e7c7fd8afeaff45fb5',
    image: 'levin.jpeg'
}, {
    name: 'Darya Aleksandrovna',
    _id: '6325c5e7c7fd8afeaff45fb6',
    image: 'darya.jpeg'
}];

module.exports = (router) => {
    router.get('/user', (req, res) => {
        const randomIndex = Math.ceil(Math.random() * 4) - 1;
        const user = mockUserData[randomIndex];
        res.status(200).send(user);
    });

    router.get('/users', (req, res) => {
        res.status(200).send(mockUserData.reduce((list, user) => {
            list[user._id] = user; return list;
        }, {}));
    });
};
