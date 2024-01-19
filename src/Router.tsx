import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Coins from './routes/Coins'
import Coin from './routes/Coin'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/:coinId'>
          <Coin />
        </Route>

        {/* 위치 중요! 반드시 최하단 */}
        <Route path='/'>
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
 
export default Router