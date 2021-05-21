// my-dashboard-component.jsx
import { ApiClient } from 'admin-bro'
import { Box } from '@admin-bro/design-system'

const api = new ApiClient()

const Dashboard = () => {
  

  return (
    <Box variant="grey">
      <Box variant="white">
      <li class="collection-item">
                    <div class="row">
                        <div class="col s3">Name</div>
                        <div class="col s3">location</div>
                        <div class="col s3">State</div>
                        <div class="col s3"> <i class="material-icons">mic</i>
                            <h6>Speech to control the devices(need future develop)</h6>
                        </div>


                    </div>

                </li>
      </Box>
    </Box>
  )
}

export default Dashboard