export const querys = {
    getAllUsers: 'SELECT * FROM Users',
    newPublication: 'INSERT INTO Publications VALUES (@idUser,@textDescription,@imgSrc,GETDATE())',
    getLastPublication: 'SELECT top 1 * FROM Publications ORDER BY madeIN DESC',
    getAllPublications: 'SELECT * FROM Publications ORDER BY madeIn DESC'
}