# E10 · la parte de feriados (para el grupo g4), del grupo g3_el_mes

Tres escenas listas para pegar en `REEMPLAZOS['E10']['escenas']` (después de las de vacaciones). Capturas del v3 tomadas el 09/11/2026
con `scripts/capturas_g3_el_mes.js`; los focos ya pasaron el OCR de `serie.buscar`. Cifras del capítulo 18 del manual v3 (caso FERIADOS,
releído en contable19; .jor y 1 de mayo con los criterios de los lotes 31a y 31b). Capítulo a sumar en `capitulos`: '18'.

No usar `c18_01_dias_festivos` ni `c18_02_banda_sin_feriados`: son copias del v2 (no se rehicieron). Si se quiere mostrar Días festivos,
hay que tomarla de nuevo (FM SYSTEMS, Vacaciones › Configuración › Días festivos, filtro 2026: 16 feriados; FM aún no tiene los de 2027).

```python
        {'t': 'cap', 'img': 'c18_04c_opciones_feriados', 'rotulo': 'Compañía › PLAME: feriados y licencia con goce aparte',
         'focos': ['Declarar aparte'],
         'voz': 'Los feriados se registran cada año en Días festivos y no descuentan: el feriado es descanso remunerado. Por defecto se pagan dentro de la básica. '
                'Con la opción Declarar aparte los feriados y la licencia con goce, la boleta los paga en líneas propias, para el cero uno uno cinco y el cero nueve cero siete del PLAME. '
                'El total, los aportes y la renta de quinta no cambian.'},
        {'t': 'cap', 'img': 'c18_03_feriados_aparte', 'rotulo': 'Diciembre de 2026: feriados aparte y trabajo en feriado',
         'focos': ['FER_001', 'TFER_001'],
         'voz': 'En el caso FERIADOS, con tres feriados en diciembre y un sueldo de [[S 3000]], la boleta paga [[S 300]] de feriados y [[S 2700]] de básica. '
                'Este trabajador laboró ocho horas el ocho de diciembre sin descanso sustitutorio: el trabajo en feriado se paga con el cien por ciento, '
                'doce cincuenta por ocho, por dos: [[S 200]]. El total del mes es [[S 3200]].'},
        {'t': 'cap', 'img': 'c18_04b_opciones_feriados', 'rotulo': 'PLAME: .jor, dominical de la semanal y 1 de mayo',
         'focos': ['Solo las trabajadas', 'Aparte, en el 0115', 'Pagar un dia adicional'],
         'voz': 'En el punto jor van las horas trabajadas: ciento sesenta en diciembre, o ciento sesenta y ocho con las ocho del feriado trabajado. '
                'En la semanal, el dominical y los feriados van aparte, al cero uno uno cinco, y quedan guardados al validar. '
                'Y si el uno de mayo cae en el día de descanso semanal, se paga un día más: [[S 100]] con un sueldo de tres mil. '
                'Las horas del feriado que pasan la jornada son un criterio pendiente de confirmación de la contadora.'},
```

Cifra clave sugerida si el E10 se centra en feriados: `('S/ 200,00', 'Trabajo en feriado: 8 h × 12,50 × 2 (caso FERIADOS, 70001902, diciembre de 2026).')`.
