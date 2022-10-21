export default function Edit(){
    return(
    <div className="container">
    
    <div className="col-lg-12 text-lg-center">
        <h2>Editar Perfil</h2>

    </div>
    <div className="col-lg-8 push-lg-4 personal-info">
         <form role="form">
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Nombre</label>
                <div className="col-lg-9">
                    <input className="form-control" type="text" value="" />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Email</label>
                <div className="col-lg-9">
                    <input className="form-control" type="email" value="" />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Password</label>
                <div className="col-lg-9">
                    <input className="form-control" type="password" value="11111122333" />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                <div className="col-lg-9">
                    <input className="form-control" type="password" value="" />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-form-label form-control-label"></label>
                <div className="col-lg-9">
                    <input type="reset" className="btn btn-secondary" value="Cancel" />
                    <input type="button" className="btn btn-primary" value="Save Changes" />
                </div>
            </div>
        </form>
    </div>
    
</div>);
}