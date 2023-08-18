import React from "react";
import logo from "./Logo app.jpeg"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      curso: "",
      seccion: "",
      documento: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].curso = dato.curso;
        arreglo[contador].seccion = dato.seccion;
        arreglo[contador].documento = dato.documento;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  imprimirListado = () => {
    const listadoTexto = this.state.data.map((dato) => (
      `ID: ${dato.id}, Nombre: ${dato.nombre}, Curso: ${dato.curso}, Sección: ${dato.seccion}, Documento: ${dato.documento}\n`
    )).join("");

    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`<pre>${listadoTexto}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };


  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <Button id="boton-imprimir" class="btn btn-primary" color="success" onClick={this.imprimirListado}>Imprimir Listado</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>nombre</th>
                <th>curso</th>
                <th>seccion</th>
                <th>documento</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.curso}</td>
                  <td>{dato.seccion}</td>
                  <td>{dato.documento}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

         <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                curso: 
              </label>
              <input
                className="form-control"
                name="curso"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.curso}
              />
            </FormGroup>

            <FormGroup>
              <label>
                seccion: 
              </label>
              <input
                className="form-control"
                name="seccion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.seccion}
              />
            </FormGroup>

            <FormGroup>
              <label>
                documento: 
              </label>
              <input
                className="form-control"
                name="documento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.documento}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
            id="boton-especifico" class="btn btn-primary"
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Confirmar
            </Button>
            <Button
              id="boton-cancelar" class="btn btn-primary"
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                curso: 
              </label>
              <input
                className="form-control"
                name="curso"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                seccion: 
              </label>
              <input
                className="form-control"
                name="seccion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                documento: 
              </label>
              <input
                className="form-control"
                name="documento"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              id="boton-insertar" class="btn btn-primary"
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
