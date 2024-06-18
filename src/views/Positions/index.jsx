import Header from "../../components/Header"
import Table from "./PositionsTable"
import { useNavigate } from "react-router-dom"
import CreateButton from "../../components/Buttons/CreateButton"

const PositionsPage = () => {
  const navigate = useNavigate()

  return (
    <div className="PositionsPage">
      <Header
        title="Positions"
        extra={
            <CreateButton
              onClick={() => navigate(`/positions/create`)}
              title="Create position"
            />
        }
      />
      <div style={{ padding: "20px" }}>
        <Table />
      </div>
    </div>
  )
}

export default PositionsPage
