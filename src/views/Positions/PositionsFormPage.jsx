import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import CancelButton from "../../components/Buttons/CancelButton"
import SaveButton from "../../components/Buttons/SaveButton"
import CBreadcrumbs from "../../components/CBreadcrumbs"
import FormCard from "../../components/FormCard"
import FRow from "../../components/FormElements/FRow"
import HFTextField from "../../components/FormElements/HFTextField"
import Header from "../../components/Header"
import positionsService from "../../services/positionsService"

const PositionsFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [btnLoader, setBtnLoader] = useState(false)
  const [loader, setLoader] = useState(true)


  const breadCrumbItems = [
    {
      label: 'Positions',
    },
    {
      label: 'Create'
    }
  ]

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: ''
    }
  })


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    if (!id) return setLoader(false)

    positionsService
      .getById(id)
      .then((res) => {
        
        reset(res)
      })
      .finally(() => setLoader(false))
  }


  const onSubmit = (values) => {
    if (id) return update(values)
    create(values)
  }

  const create = (data) => {
    setBtnLoader(true)
    positionsService
      .create(data)
      .then((res) => {
        navigate(`/positions`)
      })
      .finally(() => setBtnLoader(false))
  }

  const update = (data) => {
    setBtnLoader(true)
    positionsService
      .update({
        ...data,
        id
      })
      .then((res) => {
        navigate(`/positions`)
      })
      .finally(() => setBtnLoader(false))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <Header
        loader={loader}
        backButtonLink={'/positions'}
        title="Positions"
        extra={
          <>
            <CancelButton onClick={() => navigate(-1)} />
            <SaveButton type="submit" loading={btnLoader}  />
          </>
        }
      >
        <CBreadcrumbs withDefautlIcon items={breadCrumbItems} />
      </Header>
      <FormCard visible={!loader} title="Main info">
       
        <FRow label="Title">
          <HFTextField fullWidth control={control} name="title" />
        </FRow>

      </FormCard>
    </form>
  )
}

export default PositionsFormPage
