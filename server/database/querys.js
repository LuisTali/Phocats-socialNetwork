export const querys = {
    getAllUsers: 'SELECT * FROM Users',
    insertNewUser: 'INSERT INTO Users VALUES (@email,@username,@password,@completename,GETDATE(),null,@birthdate)',
    authenticateUser: 'SELECT * FROM Users WHERE username = @username AND password = @password',
    getUserById: 'SELECT * FROM Users WHERE id = @id',
    getUserByUsername: 'SELECT * FROM Users WHERE username = @username',
    
    newPublication: 'INSERT INTO Publications VALUES (@idUser,@textDescription,@imgSrc,GETDATE())',
    getLastPublication: 'SELECT top 1 * FROM Publications ORDER BY madeIN DESC',

    getPostsFromFollowedUsers: 'SELECT p.id, p.idUser, textDescription, imgName, p.madeIn, username as userCreator, followSince FROM Publications AS p INNER JOIN Followers AS f ON f.idUser2 = p.idUser INNER JOIN Users AS u ON u.id = p.idUser WHERE f.idUser1 = @idUser',
    
    getAllPublications: 'SELECT * FROM Publications ORDER BY madeIn DESC',
    getPublicationsByIdUser: 'SELECT * FROM Publications WHERE idUser = @idUser ORDER BY madeIn DESC',
    getPublicationsByNameTag: 'SELECT p.id,idUser,textDescription,imgName,madeIn FROM Publications AS p INNER JOIN Publications_X_Tag AS pxt ON p.id = pxt.idPublication INNER JOIN Tags AS t ON pxt.idTag = t.id WHERE t.nameTag = @nameTag',
    getPublicationById: 'SELECT * FROM Publications WHERE id = @id',

    //idFollower es la cuenta desde la que sigo al idFollowing
    followAccount: 'INSERT INTO Followers VALUES (@idFollower, @idFollowing,GETDATE(),DEFAULT)',
    checkFollow: 'SELECT id FROM Users AS u2 WHERE EXISTS (SELECT * FROM Users AS u1 INNER JOIN Followers AS f ON f.idUser1 = u1.id WHERE f.idUser2 = u2.id AND f.idUser1 = @idFollower) AND id=@idFollowing;',
    unfollowAccount: 'DELETE FROM Followers WHERE idUser1 = @idFollower AND idUser2 = @idFollowing;',
    makeNotificacionsForUser: 'SELECT u1.id as idFollower, u1.username as follower, f.notificated FROM Users as u1 INNER JOIN Followers AS f on f.idUser1 = u1.id INNER JOIN Users AS u2 ON f.idUser2 = u2.id WHERE f.idUser2 = @idUser ORDER BY f.followSince DESC;',
    updateNotifiedFollow: 'UPDATE Followers SET notificated = 1 WHERE idUser2 = @idAccount AND idUser1 = @idFollower',
    
    checkExistsTag: 'SELECT id FROM Tags WHERE nameTag = @tag',
    newTag:'INSERT INTO Tags VALUES (@tag)',
    addTagPerPublication: 'INSERT INTO Publications_X_Tag VALUES (@idPublication,@idTag)',
    getIdTagByName:'SELECT id FROM Tags WHERE nameTag=@nameTag',
    getTop3MostUsedTags: 'SELECT TOP 3 count(*) AS cantUsados, t.nameTag FROM Tags AS t INNER JOIN Publications_X_Tag AS pxt ON t.id = pxt.idTag GROUP BY t.nameTag ORDER BY cantUsados DESC'
    
}