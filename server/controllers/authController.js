const loginController = async (req, res) => {
    try {
      const { name } = req.body;
  
      res.send(`Hello ${name}`);
    } catch (error) {
      res.send({ error });
    }
  };
  
  module.exports = { loginController };