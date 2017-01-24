import './index.html';
import './index.css';
import dva, {connect} from 'dva';
import 'antd/dist/antd.css';
// 1. Initialize
const app = dva();

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/main'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
