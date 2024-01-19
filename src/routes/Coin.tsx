import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom"
import styled from "styled-components"
import Chart from "./Chart"
import Price from "./Price"
import { useQuery } from "@tanstack/react-query"
import { fetchCoinInfo, fetchCoinTickers } from "../api"

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.textColor};
`
const Loader = styled.div`
  text-align: center;
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`
const Description = styled.p`
  margin: 20px 0px;
  line-height: 1.3
`
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`
const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.$isActive ? props.theme.accentColor : props.theme.textColor};
    
  a {
    display: block;
  }
`

interface RouteParams {
  coinId: string
}
interface RouteState {
  name: string
}
interface IInfo {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  $isActive: boolean
  type: string
  logo: string
  description: string
  message: string
  open_source: boolean
  started_at: string
  development_status: string
  hardware_wallet: boolean
  proof_type: string
  org_structure: string
  hash_algorithm: string
  first_data_at: string
  last_data_at: string
}
interface IPrice {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      ath_date: "2021-11-10T16:50:00Z"
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  }
}

function Coin() {
  const { coinId } = useParams<RouteParams>() // url의 :coinId
  const { state } = useLocation<RouteState>() // react router DOM이 보내주는 location obj <Link to={{ state: {} }} 

  const { isLoading: infoLoading, data: info } = useQuery<IInfo>({
    queryKey: ["info", coinId], // key must be unique
    queryFn: () => fetchCoinInfo(coinId)
  })
  const { isLoading: tickersLoading, data: tickers } = useQuery<IPrice>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
    // refetchInterval: 10000
  })
  const isLoading = infoLoading || tickersLoading

  const chartMatch = useRouteMatch("/:coinId/chart") // 현재 주소와 입력 주소 일치 여부
  const priceMatch = useRouteMatch("/:coinId/price")
  
  /* before react-query
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState<IInfo>() 
  const [priceInfo, setPriceInfo] = useState<IPrice>()

  useEffect(() => {
    (async () => {
      // 캡슐화 capsulation
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
      setInfo(infoData)
      setPriceInfo(priceData)
      setLoading(false)
    })()
  }, [coinId])
  */

  return (
    <Container>
      <Header>
        <Title>
          {/* Tab 클릭시 state.name 소실 방지 */}
          {state?.name ? state.name : (isLoading ? "Loading.." : info?.name)}
        </Title>
      </Header>

     {isLoading ?
        <Loader>Loading..</Loader> :
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickers?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickers?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickers?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
          </Switch>
        </>
      }
    </Container>
  )
}

export default Coin