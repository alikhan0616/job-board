type PageProps = {
    params: {
        orgId: string;
    }
}
export default async function CompanyJobPage(props:PageProps){
    const params = await props.params.orgId
    return(
        <div>{params}</div>
    )
}