// app/dashboard/profile/page.jsx
import EditProfile from '@/app/components/profile/EditProfile'
// import { getUserSession } from '@/lib/session'
import { getUserSession } from '@/lib/core/session'
// import EditProfile from '@/components/EditProfile'

const ProfilePage = async () => {
    const user = await getUserSession()
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-6">Edit Profile</h1>
            <EditProfile user={user} />
        </div>
    )
}

export default ProfilePage