import del from 'del'
import config from '../config'

const clean = () => { return del(config.dest.root) }

export default clean
