const { redisClient } = require('./config/redisClient');

const Game = redisClient.fetchRepository(userSchema);
(async () => {
    await userRepository.createIndex();
})();

const updateScore = async(req, res) => {
    const user = await Game.fetch(req.currUserId);
    
    console.log("user is as follows", user)

    user.score = user.score + 1;
    await userRepository.save(user);

    res.send(user)
}

const GetLeaderboard = async(req, res) => {
    try {
        const leaderboard = await Game.search()
        .sortDescending('score')
        .return.page(0, 10);

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = { GetLeaderboard, updateScore };
