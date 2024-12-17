import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { PencilIcon } from "lucide-react";
import DeleteReservation from "./delete-reservation";
import Image from "next/image";
import { Booking, Guest, Room } from "@/lib/type";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

type ReservationCardProps = {
  booking: Booking & { rooms: Pick<Room, "name" | "image"> | null } & {
    guests: Pick<Guest, "email"> | null;
  };
};

function ReservationCard({ booking }: ReservationCardProps) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at: createdAt,
    rooms,
    guests,
  } = booking;

  return (
    <div className="flex border border-primary-800">
      <Image
        src={rooms!.image || ""}
        alt={rooms!.name || ""}
        width={200}
        height={200}
        className="border-r border-primary-800 object-cover"
      />
      <div className="flex flex-grow flex-col px-6 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in {rooms?.name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200">
              past
            </span>
          ) : (
            <span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex items-baseline gap-5">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex w-[100px] flex-col border-l border-primary-800">
        {!isPast(new Date(startDate)) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex flex-grow items-center gap-2 border-b border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
            >
              <PencilIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} email={guests!.email} />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;