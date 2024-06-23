"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../prismaClient";

// CREATE SELL
export async function createSell(
  envio: string,
  direccion: string | undefined,
  pais: string | undefined,
  ciudad: string | undefined,
  codigo_postal: string | undefined,
  cantidad_libros: number,
  impuestos: number,
  subtotal: number,
  total: number,
  id_stripe: string,
  id_libro: number
) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("User ID is undefined");
    }

    const createdSell = await prisma.ventas.create({
      data: {
        ENVIO: envio,
        DIRECCION: direccion,
        PAIS: pais,
        CIUDAD: ciudad,
        CODIGO_POSTAL: codigo_postal,
        CANTIDAD_LIBROS: cantidad_libros,
        IMPUESTOS: impuestos,
        SUBTOTAL: subtotal,
        TOTAL: total,
        ID_STRIPE: id_stripe,
        libro: {
          connect: { ID_LIBRO: id_libro },
        },
        ID_USUARIO: userId?.toString(),
      },
    });

    return createdSell;
  } catch (error) {
    throw new Error("Unable create sell. Please try again later.");
  }
}

//Getting all of the database sells
export async function getAllSellsService() {
  try {
    //Using prisma "findMany" to get all sells
    const requestedSells = await prisma.ventas.findMany();
    return requestedSells;
  } catch (error) {
    console.error("Error fetching Sells:", error);
    throw new Error("Unable to fetch Sells. Please try again later.");
  }
}

//Getting one specific sell by id
export async function getSellService(id: number) {
  try {
    //with findUnique you can search for "Unique" denominated fields on prisma schema
    const requestedSell = await prisma.ventas.findUnique({
      where: {
        ID_VENTAS: id,
      },
    });

    return requestedSell;
  } catch (error) {
    throw new Error("Unable get sell. Please try again later.");
  }
}

//Updating sell
export async function updateSellService(
  id: number,
  cantidad_libros: number,
  impuestos: any,
  subtotal: any,
  total: any,
  id_libro: number
) {
  try {
    const requestedSell = await prisma.ventas.update({
      where: { ID_VENTAS: id },
      data: {
        CANTIDAD_LIBROS: cantidad_libros,
        IMPUESTOS: impuestos,
        SUBTOTAL: subtotal,
        TOTAL: total,
        libro: {
          connect: { ID_LIBRO: id_libro },
        },
      },
    });

    return requestedSell;
  } catch (error) {
    throw new Error("Unable update sell. Please try again later.");
  }
}

//Deleting a sell
export async function deleteSellService(id: number) {
  try {
    const requestedSell = await prisma.ventas.delete({
      where: { ID_VENTAS: id },
    });

    return requestedSell;
  } catch (error) {
    throw new Error("Unable delete sell. Please try again later.");
  }
}
