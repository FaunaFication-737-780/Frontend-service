// my-dashboard-component.jsx
import { ApiClient } from 'admin-bro'
import { Box } from '@admin-bro/design-system'

const api = new ApiClient()

const Dashboard = () => {
  

  return (
    <Box variant="grey">
      <Box variant="white">
        Hello to the admin portal!
      </Box>
    </Box>
  )
}

export default Dashboard