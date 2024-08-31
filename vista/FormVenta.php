<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">

        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">

        <!-- encabezado-->
        <div class="card">
            <div class="card-header">
                <div class="card-title">Encabezado</div>
                <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                        <i class="fas fa-minus"></i>
                    </button>

                    <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="card-body">
                <div class="row">
                    <div class="form-group row col-md-9">
                        <div class="form-group col-md-3">
                            <label for="">#Factura</label>
                            <input type="number" class="form-control" name="numFactura" id="numFactura" readonly>
                        </div>

                        <div class="form-group col-md-3">
                            <label for="">Actividad economica</label>
                            <select name="actEconomica" id="actEconomica" class="form-control" >
                            </select>

                        </div>

                        <div class="form-group col-md-3">
                            <label for="">Tipo de documento</label>
                            <select name="tpDocumenti" id="tpDocumento" class="form-control">
                                <option value="1">Ninguno</option>
                                <option value="1">Cedula de identidad</option>
                                <option value="5">NIT</option>
                            </select>
                        </div>


                        <div class="form-group col-md-3">
                            <label for="">NIT/CI</label>
                            <div class="input-group">
                                <input type="text" class="form-control" list="listaClientes" name="nitCliente" id="nitCliente">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" onclick="busCliente()">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                                <datalist id="listaClientes">
                                    <?php
                                    $cliente = ControladorCliente::ctrInfoClientes();
                                    foreach ($cliente as $value) {
                                        echo "<option value='{$value["nit_ci_cliente"]}'> {$value["razon_social_cliente"]}</option>";
                                    }
                                    ?>
                                </datalist>
                            </div>
                        </div>



                        <div class="form-group col-md-6">
                            <label for="">E-mail</label>
                            <input type="email" class="form-control" name="emailCliente" id="emailCliente">
                        </div>

                        <div class="form-group col-md-6">
                            <label for="">Razon social</label>
                            <input type="text" class="form-control" name="rsCliente" id="rsCliente">
                        </div>

                    </div>

                    <div class="form-group row col-md-3">
                        <div class="card">
                            <div class="input-group sm-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Subtotal</span>
                                </div>
                                <input type="text" class="form-control" name="subTotal" id="subTotal" value="0.00" readonly>
                            </div>


                            <div class="input-group sm-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Descuento</span>
                                </div>
                                <input type="text" class="form-control" name="descAdicional" id="descAdicional" value="0.00">
                            </div>

                            <div class="input-group sm-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Total</span>
                                </div>
                                <input type="text" class="form-control" name="totApagar" id="totApagar" value="0.00" readonly>
                            </div>

                            <div class="card-footer">
                                <label for="">Metodo de pago</label>
                                <div class="input-group">
                                    <select name="metPago" id="metPago" class="form-control">
                                        <option value="1">Efectivo</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <button class="btn btn-success" onclick="emitirFactura()">Guardar</button>
            </div>
        </div>

        <!-- carrito -->

        <div class="card">
            <div class="card-header">
                <div class="card-title">Agregar producto</div>
                <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                        <i class="fas fa-minus"></i>
                    </button>

                    <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>



            <div class="card-body">
                <div class="row">
                    <div class="form-group col-md-2">
                        <label for="">Cod. Producto</label>
                        <div class="input-group form-group">
                            <input type="hidden" list="codigoProducto" class="form-control" name="codProducto" id="codProductoSin">


                            <input type="text" list="codigoProducto" class="form-control" name="codProducto" id="codProducto">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" onclick="datosProducto()">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            <datalist id="codigoProducto">
                                <?php
                                $producto = ControladorProducto::ctrInfoProductos();
                                foreach ($producto as $value) {
                                    echo "<option value='{$value["cod_producto"]}'> {$value["nombre_producto"]}</option>";
                                }
                                ?>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="">Concepto</label>
                        <div class="input-group form-group">
                            <input type="text" class="form-control" name="conceptoPro" id="conceptoPro" readonly>
                        </div>
                    </div>




                    <div class="form-group col-md-1">
                        <label for="">Cantidad</label>
                        <div class="input-group form-group">
                            <input type="text" class="form-control" name="cantProducto" id="cantProducto" value="0" onkeyup="calculartotal()">
                        </div>
                    </div>


                    <div class="form-group col-md-1">
                        <label for="">U. Medida</label>
                        <div class="input-group form-group">
                        <input type="hidden" class="form-control" name="uniMedida" id="uniMedidaSin">
                        
                        <input type="text" class="form-control" name="uniMedida" id="uniMedida">
                        </div>
                    </div>


                    <div class="form-group col-md-1">
                        <label for="">P. Unit</label>
                        <div class="input-group form-group">
                            <input type="number" class="form-control" name="preUnitario" id="preUnitario" readonly value="0">
                        </div>
                    </div>

                    <div class="form-group col-md-1">
                        <label for="">Descuento</label>
                        <div class="input-group form-group">
                            <input type="text" class="form-control" name="descProducto" value="0.00" id="descProducto" onkeyup="calculartotal()">
                        </div>
                    </div>


                    <div class="form-group col-md-1">
                        <label for="">P. Total</label>
                        <div class="input-group form-group">
                            <input type="text" class="form-control" name="preTotal" id="preTotal" value="0.00" readonly>
                        </div>
                    </div>


                    <div class="form-group col-md-1">
                        <label for="">&nbsp;</label>
                        <div class="input-group form-group">
                            <button class="btn btn-info btn-circle form-control" onclick="agregarCarrito()">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
<table class="table">
    <thead>
        <tr>
        <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Descuento</th>
            <th>Precio Total</th>
            <th>&nbsp;</th>
        </tr>
    </thead>
    <tbody id="listaDetalle">

    </tbody>
</table>




            </div>
        </div>
    </div>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->