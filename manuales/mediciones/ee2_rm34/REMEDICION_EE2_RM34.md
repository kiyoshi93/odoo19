# Remedición de RM-3 y RM-4 (ficha del trabajador) — nómina Enterprise

**Base medida:** `demoContable` en https://148.113.151.40.sslip.io (Odoo 19.0 Enterprise).

**Fecha:** 2026-10-28.

**Cómo se midió:** RPC y navegador, con el administrador (id 2, sin superusuario) y la compañía «SOLSE Demo Servicios S.A.C.» activa, más el log del `-u` de Gabriel. No se cambió nada en la ficha.

## Resumen

| Punto | Estado | Medido |
|---|---|---|
| 1. Versión | **OK** | `solse_pe_payroll` 19.0.1.16.7. Las otras cinco sin cambio. |
| 2. Log del `-u` | **OK** | Ningún ERROR de nómina. Sale «Nómina PE: inicialización de estructuras completada.». |
| 3. Ficha de Carlos | **OK** | RM-3: el grupo «Perú - Datos laborales» con los 15 campos en «Nómina». RM-4: las 4 cuentas de «Nómina PE» con valor (BCP e Interbank). |
| 4. NOMINA | **OK** | 100 %, 366/366 celdas, 6/6 estructuras. |

## 1. Versión — OK

| Módulo | Versión |
|---|---|
| `solse_pe_payroll` | **19.0.1.16.7** |
| `solse_pe_payroll_demo` | 19.0.1.6.5 |
| `solse_pe_payroll_catalogo` | 19.0.0.3 |
| `solse_pe_payroll_renta5` | 19.0.1.0.1 |
| `solse_pe_payroll_asistencia_ee_demo` | 19.0.1.2.1 |
| `solse_pe_plame_ee_demo` | 19.0.1.1.1 |

## 2. Log del `-u solse_pe_payroll` — OK

Adjunto: `log_u_lote_ee2_rm34.txt`.

- Solo corre la `Running upgrade [>0.0.0] pre-migrate` de siempre.
- «Nómina PE: inicialización de estructuras completada.» (líneas 277 y 446).
- **ERROR (48), todos ajenos a nómina:** `ai.embedding`, `mkb.*` y `smigracion.*` sin tabla.

## 3. Ficha de Carlos (99998001) — OK

**Pestaña «Nómina» (RM-3):** después del contrato y el horario aparece el grupo **«PERÚ - DATOS LABORALES (T-REGISTRO / PLAME)»** con los 15 campos:

| Campo | Valor |
|---|---|
| Régimen Laboral | D LEG N.° 728 |
| Tipo de contrato (T12) | **[01] A PLAZO INDETERMINADO - D.LEG. 728** |
| Ocupación de trabajo · Situación especial · Motivo de baja · Tipo de pago · Remuneración variable | vacíos (la demo no los usa) |
| Porcentaje de adelanto | 0.00 |
| Jornada de trabajo máxima · Jornada atípica o acumulativa · Trabajo en horario nocturno · Sindicalizado · ¿Es practicante? · Remuneración en especie · No mostrar horas extras en boleta | sin marcar |

Captura: `p3_pestana_nomina.png`.

**Pestaña «Nómina PE», «Cuentas bancarias» (RM-4):**

| Campo | Valor |
|---|---|
| Cuenta sueldo | con valor |
| Banco sueldo | Banco De Credito Del Peru |
| Cuenta CTS | con valor |
| Banco CTS | INTERBANK |

Captura: `p3_pestana_nomina_pe.png`, con los números de cuenta tapados.

## 4. NOMINA en el Laboratorio — OK

Limpiar, Sembrar (13 empleados), Generar (36 boletas validadas) y Comparar: **100 % · CONFORME**, 366/366 celdas, 0 distintas, 6/6 estructuras.
