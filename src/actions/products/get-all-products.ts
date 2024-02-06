'use server'
import prisma from "@/lib/prisma"

export const getAllProducts = async() => {


  try {
    
    const products = await prisma.product.findMany({
      orderBy: {
        title: 'asc'
      }
    })

    return {products}

  } catch (error) {
    return {
      products: []
    }
  }

}