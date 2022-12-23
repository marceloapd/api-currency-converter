const environments = require('./src/environments')
const app = require('./src/app')

const PORT = environments.PORT

app.listen(PORT, () => console.log(`Server is runing on http://localhost:${PORT}/`))