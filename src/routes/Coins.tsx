import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { fetchCoins } from "../api"
import { Helmet } from "react-helmet"

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
const CoinList = styled.ul``
const Coin = styled.li`
  background-color: whitesmoke;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;

  a {
    padding: 20px; // 텍스트 외부에서도 클릭할 수 있게
    display: flex; 
    align-items: center;
    transition: color 0.2s ease-in;


    &:hover {
      color: ${props => props.theme.accentColor};
    }
  }
`
const Icon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}

function Coins() {
  // Queries
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
    select: data => data.slice(0, 100)
  });

  /* before react-query
  const [loading, setLoading] = useState(true)
  const [coins, setCoins] = useState<ICoin[]>([])

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins")
      const json = await response.json()
      setCoins(json.slice(0, 100))
      setLoading(false)
    })()
  }, [])
  */

  return (
    <Container>
      {/* <head> of document */}
      <Helmet>
        <title>Coins</title>
      </Helmet>

      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ?
        <Loader>Loading..</Loader> : (
        <CoinList>
          {data?.map(coin => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: {
                  name: coin.name,
                  symbol: coin.symbol.toLowerCase()
                }
              }}>
                <Icon
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  )
}

export default Coins